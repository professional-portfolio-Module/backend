import { pool } from '../config/postgres.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const redirectsFilePath = path.resolve(__dirname, '../config/redirects.json');

async function seed() {
  console.log("Fetching all assets from database...");
  try {
    const result = await pool.query('SELECT card_no FROM assets');
    const cardNos = result.rows.map((row: any) => row.card_no);
    console.log(`Found ${cardNos.length} assets.`);

    let redirects: Record<string, string> = {};
    if (fs.existsSync(redirectsFilePath)) {
      const data = fs.readFileSync(redirectsFilePath, 'utf-8');
      redirects = JSON.parse(data || '{}');
    }

    let addedCount = 0;
    for (const cardNo of cardNos) {
      if (!redirects[cardNo]) {
        redirects[cardNo] = `http://localhost:5173/manager/assets?search=${encodeURIComponent(cardNo)}`;
        addedCount++;
      }
    }

    fs.writeFileSync(redirectsFilePath, JSON.stringify(redirects, null, 2));
    console.log(`Successfully added default redirects for ${addedCount} assets.`);
  } catch (error) {
    console.error("Error seeding QR redirects:", error);
  } finally {
    await pool.end();
  }
}

seed();
