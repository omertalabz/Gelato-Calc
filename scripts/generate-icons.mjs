import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

// Function to generate a valid solid/pattern PNG with RGBA buffer
function createPng(width, height, drawFn) {
  const bytesPerPixel = 4;
  const scanlineLength = width * bytesPerPixel + 1; // +1 for filter byte
  const rawData = Buffer.alloc(scanlineLength * height);

  for (let y = 0; y < height; y++) {
    const scanlineOffset = y * scanlineLength;
    rawData[scanlineOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pixelOffset = scanlineOffset + 1 + x * bytesPerPixel;
      const [r, g, b, a] = drawFn(x, y, width, height);
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bits per channel
  ihdr[9] = 6; // Color type 6: RGBA
  ihdr[10] = 0; // Compression 0 (deflate)
  ihdr[11] = 0; // Filter 0
  ihdr[12] = 0; // Interlace 0 (none)

  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(8 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// CRC32 table & calculation
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

// Draw Gelato Brand Icon
function drawGelatoIcon(x, y, w, h) {
  // Center coordinates
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Background rounded card (slate-900 / dark blue)
  // Distance from border for rounded corners
  const radius = w * 0.22;
  const qx = Math.max(0, Math.abs(dx) - (w / 2 - radius));
  const qy = Math.max(0, Math.abs(dy) - (h / 2 - radius));
  const cornerDist = Math.sqrt(qx * qx + qy * qy);

  if (cornerDist > radius) {
    return [0, 0, 0, 0]; // Transparent outside rounded corner
  }

  // Base background color #0f172a
  let r = 15, g = 23, b = 42, a = 255;

  // Thin outer cyan accent ring
  if (Math.abs(dist - w * 0.42) < w * 0.008) {
    return [56, 189, 248, 120];
  }

  // Ice Cream Cone: V-shape at bottom
  // Tip at (cx, cy + h*0.35), top edge from (cx - w*0.14) to (cx + w*0.14) at (cy + h*0.06)
  const coneTipY = cy + h * 0.34;
  const coneTopY = cy + h * 0.05;
  if (y >= coneTopY && y <= coneTipY) {
    const progress = (y - coneTopY) / (coneTipY - coneTopY);
    const halfWidth = (w * 0.14) * (1 - progress);
    if (Math.abs(dx) <= halfWidth) {
      // Cone amber-brown color with waffle texture
      const waffle = ((x + y) % Math.round(w * 0.04) < 2) ? 140 : 180;
      return [waffle, Math.round(waffle * 0.6), 20, 255];
    }
  }

  // Left scoop: Amber/Gold scoop at (cx - w*0.08, cy - h*0.04)
  const dScoop1 = Math.hypot(x - (cx - w * 0.08), y - (cy - h * 0.04));
  if (dScoop1 < w * 0.13) {
    return [245, 158, 11, 255]; // Amber 500
  }

  // Right scoop: Sky Blue / Cyan (PAC freezing crystal) at (cx + w*0.08, cy - h*0.04)
  const dScoop2 = Math.hypot(x - (cx + w * 0.08), y - (cy - h * 0.04));
  if (dScoop2 < w * 0.13) {
    return [14, 165, 233, 255]; // Sky 500
  }

  // Top center scoop: Cream White (Fiordilatte) at (cx, cy - h*0.16)
  const dScoop3 = Math.hypot(x - cx, y - (cy - h * 0.16));
  if (dScoop3 < w * 0.14) {
    // Add small ice crystal / snowflake dot in center
    if (dScoop3 < w * 0.02) {
      return [2, 132, 199, 255];
    }
    return [255, 255, 255, 255];
  }

  return [r, g, b, a];
}

// Generate files in public directory
const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, drawGelatoIcon));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, drawGelatoIcon));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, drawGelatoIcon));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, drawGelatoIcon));

console.log('Successfully generated PWA PNG icons in /public:');
console.log('- pwa-192x192.png');
console.log('- pwa-512x512.png');
console.log('- apple-touch-icon.png');
console.log('- pwa-maskable-512x512.png');
