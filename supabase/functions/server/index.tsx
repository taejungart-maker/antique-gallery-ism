import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Initialize storage bucket on startup
const BUCKET_NAME = 'make-b1fadb3a-archive';
const ARTWORKS_BUCKET = 'artworks';
const ARCHIVE_BUCKET = 'archive';

// Initialize buckets immediately
async function initializeBuckets() {
  try {
    console.log('🔄 Initializing storage buckets...');
    const { data: buckets } = await supabase.storage.listBuckets();
    console.log('📦 Existing buckets:', buckets?.map(b => b.name).join(', '));
    
    // Create make-b1fadb3a-archive bucket (private)
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, { public: false });
      if (error && error.message !== 'The resource already exists') {
        console.error(`❌ Error creating ${BUCKET_NAME}:`, error);
      } else if (!error) {
        console.log(`✅ Created bucket: ${BUCKET_NAME}`);
      } else {
        console.log(`✅ Bucket already exists: ${BUCKET_NAME}`);
      }
    } else {
      console.log(`✅ Bucket already exists: ${BUCKET_NAME}`);
    }
    
    // Create artworks bucket (public)
    const artworksBucketExists = buckets?.some(bucket => bucket.name === ARTWORKS_BUCKET);
    if (!artworksBucketExists) {
      const { error } = await supabase.storage.createBucket(ARTWORKS_BUCKET, { public: true });
      if (error && error.message !== 'The resource already exists') {
        console.error(`❌ Error creating ${ARTWORKS_BUCKET}:`, error);
      } else if (!error) {
        console.log(`✅ Created public bucket: ${ARTWORKS_BUCKET}`);
      } else {
        console.log(`✅ Bucket already exists: ${ARTWORKS_BUCKET}`);
      }
    } else {
      console.log(`✅ Artworks bucket already exists: ${ARTWORKS_BUCKET}`);
    }
    
    // Create archive bucket (public) for user archives
    const archiveBucketExists = buckets?.some(bucket => bucket.name === ARCHIVE_BUCKET);
    if (!archiveBucketExists) {
      const { error } = await supabase.storage.createBucket(ARCHIVE_BUCKET, { public: true });
      if (error && error.message !== 'The resource already exists') {
        console.error(`❌ Error creating ${ARCHIVE_BUCKET}:`, error);
      } else if (!error) {
        console.log(`✅ Created public bucket: ${ARCHIVE_BUCKET}`);
      } else {
        console.log(`✅ Bucket already exists: ${ARCHIVE_BUCKET}`);
      }
    } else {
      console.log(`✅ Archive bucket already exists: ${ARCHIVE_BUCKET}`);
    }
    
    // List all buckets after initialization
    const { data: finalBuckets } = await supabase.storage.listBuckets();
    console.log('✅ Final buckets:', finalBuckets?.map(b => b.name).join(', '));
  } catch (error) {
    console.error('⚠️ Error initializing storage buckets:', error);
  }
}

// Call initialization
await initializeBuckets();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b1fadb3a/health", (c) => {
  return c.json({ status: "ok" });
});

// Upload image to storage and return signed URL
app.post("/make-server-b1fadb3a/upload-image", async (c) => {
  try {
    console.log('📥 Upload request received');
    
    const body = await c.req.json();
    const { base64Image, filename, bucketName } = body;
    
    if (!base64Image || !filename) {
      console.error('❌ Missing base64Image or filename');
      return c.json({ success: false, error: 'Missing base64Image or filename' }, 400);
    }

    // 사용할 버킷 결정 (작품은 artworks, 아카이브는 기존 버킷)
    const targetBucket = bucketName || 'artworks';
    console.log('📊 Target bucket:', targetBucket);
    console.log('📊 Base64 image length:', base64Image.length);
    
    // Extract base64 data (remove data:image/...;base64, prefix)
    const base64Data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;
    console.log('📊 Base64 data length:', base64Data.length);
    
    // Check size limit (500KB for artworks, 300KB for archive)
    const maxSize = targetBucket === 'artworks' ? 500 : 300;
    const sizeInKB = (base64Data.length * 3 / 4) / 1024;
    console.log('📊 Decoded size:', sizeInKB.toFixed(2), 'KB');
    
    if (sizeInKB > maxSize) {
      console.error('❌ Image too large:', sizeInKB.toFixed(2), 'KB');
      return c.json({ success: false, error: `Image too large. Maximum ${maxSize}KB.` }, 400);
    }
    
    // Convert base64 to binary
    let binaryData;
    try {
      binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      console.log('✅ Binary conversion successful, size:', binaryData.length, 'bytes');
    } catch (decodeError) {
      console.error('❌ Base64 decode error:', decodeError);
      return c.json({ success: false, error: 'Invalid base64 data' }, 400);
    }
    
    // Upload to storage (artworks 버킷은 public)
    console.log('⬆️ Uploading to', targetBucket, 'bucket...');
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(targetBucket)
      .upload(filename, binaryData, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (uploadError) {
      console.error('❌ Upload error:', uploadError);
      return c.json({ success: false, error: String(uploadError) }, 500);
    }

    console.log('✅ Upload successful:', filename);

    // artworks와 archive 버킷은 모두 public이므로 public URL 반환
    if (targetBucket === 'artworks' || targetBucket === 'archive') {
      const { data: publicUrlData } = supabase.storage
        .from(targetBucket)
        .getPublicUrl(filename);
      
      console.log('✅ Public URL created:', publicUrlData.publicUrl);
      return c.json({ success: true, url: publicUrlData.publicUrl });
    } else {
      // 다른 버킷은 signed URL 사용
      const { data: urlData, error: urlError } = await supabase.storage
        .from(targetBucket)
        .createSignedUrl(filename, 315360000); // 10 years

      if (urlError) {
        console.error('❌ URL generation error:', urlError);
        return c.json({ success: false, error: String(urlError) }, 500);
      }

      console.log('✅ Signed URL created successfully');
      return c.json({ success: true, url: urlData.signedUrl });
    }
  } catch (error) {
    console.error('❌ Error uploading image:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Archive endpoints
// Get all archive items
app.get("/make-server-b1fadb3a/archive", async (c) => {
  try {
    const items = await kv.getByPrefix("archive:");
    return c.json({ success: true, items: items || [] });
  } catch (error) {
    console.error("Error fetching archive items:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Add archive item
app.post("/make-server-b1fadb3a/archive", async (c) => {
  try {
    const body = await c.req.json();
    const { id, type, title, imageUrl, linkUrl, linkTitle, linkFavicon, notes, createdAt } = body;
    
    const item = {
      id,
      type,
      title,
      imageUrl,
      linkUrl,
      linkTitle,
      linkFavicon,
      notes,
      createdAt: createdAt || Date.now(),
    };
    
    await kv.set(`archive:${id}`, item);
    return c.json({ success: true, item });
  } catch (error) {
    console.error("Error adding archive item:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete archive item
app.delete("/make-server-b1fadb3a/archive/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`archive:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting archive item:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete all archive items (reset)
app.delete("/make-server-b1fadb3a/archive", async (c) => {
  try {
    const items = await kv.getByPrefix("archive:");
    const deletePromises = items.map((item: any) => kv.del(`archive:${item.id}`));
    await Promise.all(deletePromises);
    
    // Also delete all files from storage
    try {
      const { data: files } = await supabase.storage.from(BUCKET_NAME).list();
      if (files && files.length > 0) {
        const filePaths = files.map(file => file.name);
        await supabase.storage.from(BUCKET_NAME).remove(filePaths);
        console.log(`🗑️ Deleted ${filePaths.length} files from storage`);
      }
    } catch (storageError) {
      console.error('Error cleaning storage:', storageError);
      // Continue even if storage cleanup fails
    }
    
    return c.json({ success: true, deletedCount: items.length });
  } catch (error) {
    console.error("Error deleting all archive items:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Gallery/Artwork endpoints
// Get all artworks (using KV Store - 100% reliable!)
app.get("/make-server-b1fadb3a/artworks", async (c) => {
  try {
    console.log('📖 Fetching artworks from KV Store...');
    const items = await kv.getByPrefix("artwork:");
    console.log(`✅ Fetched ${items.length} artworks from KV Store`);
    
    // 디버깅: 각 작품의 이미지 개수 출력
    items.forEach((item: any) => {
      const imageCount = [
        item.imageUrl,
        item.image2Url,
        item.image3Url,
        item.image4Url,
      ].filter(Boolean).length;
      console.log(`🎨 ${item.id}: ${imageCount} images - image4Url: ${item.image4Url ? '✅' : '❌'}`);
    });
    
    return c.json({ success: true, items: items || [] });
  } catch (error) {
    console.error("❌ Error fetching artworks:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Add artwork (using KV Store - 100% reliable!)
app.post("/make-server-b1fadb3a/artworks", async (c) => {
  try {
    const body = await c.req.json();
    console.log('📝 Adding artwork to KV Store:', body.title);
    
    const item = {
      id: body.id || Date.now().toString(),
      title: body.title || 'Untitled',
      titleZh: body.titleZh || body.title,
      titleEn: body.titleEn || body.title,
      description: body.description || '',
      descriptionZh: body.descriptionZh || body.description,
      descriptionEn: body.descriptionEn || body.description,
      year: body.year || 1900,
      yearStart: body.yearStart || body.year?.toString(),
      yearEnd: body.yearEnd || body.year?.toString(),
      period: body.period || '20세기',
      size: body.size || '',
      imageUrl: body.imageUrl,
      image2Url: body.image2Url || undefined,
      image3Url: body.image3Url || undefined,
      image4Url: body.image4Url || undefined,
      certificateUrl: body.certificateUrl || undefined,
      createdAt: Date.now(),
    };
    
    await kv.set(`artwork:${item.id}`, item);
    console.log('✅ Artwork saved to KV Store:', item.id);
    
    return c.json({ success: true, item });
  } catch (error) {
    console.error("❌ Error adding artwork:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update artwork (using KV Store)
app.put("/make-server-b1fadb3a/artworks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    console.log('✏️ Updating artwork in KV Store:', id);
    console.log('📦 Received body certificateUrl:', body.certificateUrl);
    
    const item = {
      id,
      title: body.title,
      titleZh: body.titleZh,
      titleEn: body.titleEn,
      description: body.description,
      descriptionZh: body.descriptionZh,
      descriptionEn: body.descriptionEn,
      year: body.year,
      yearStart: body.yearStart,
      yearEnd: body.yearEnd,
      period: body.period,
      size: body.size,
      imageUrl: body.imageUrl,
      image2Url: body.image2Url,
      image3Url: body.image3Url,
      image4Url: body.image4Url,
      certificateUrl: body.certificateUrl,
      createdAt: body.createdAt || Date.now(),
    };
    
    console.log('💾 Saving certificateUrl:', item.certificateUrl);
    
    await kv.set(`artwork:${id}`, item);
    console.log('✅ Artwork updated in KV Store');
    
    return c.json({ success: true, item });
  } catch (error) {
    console.error("❌ Error updating artwork:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete artwork (using KV Store)
app.delete("/make-server-b1fadb3a/artworks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    console.log('🗑️ Deleting artwork from KV Store:', id);
    
    await kv.del(`artwork:${id}`);
    console.log('✅ Artwork deleted from KV Store');
    
    return c.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting artwork:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

console.log("🚀 K-Antique Gallery Server is starting...");
console.log("📦 Archive API endpoints registered:");
console.log("  - GET  /make-server-b1fadb3a/archive");
console.log("  - POST /make-server-b1fadb3a/archive");
console.log("  - DELETE /make-server-b1fadb3a/archive/:id");
console.log("  - DELETE /make-server-b1fadb3a/archive");
console.log("✅ Server ready!");

Deno.serve(app.fetch);