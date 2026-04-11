#!/usr/bin/env node

/**
 * cv.json Validator
 *
 * Usage:
 *   node validate.js path/to/cv.json
 *   node validate.js https://freecv.org/p/ashley/cv.json
 *
 * Requires: npm install ajv ajv-formats
 */

const fs = require('fs');
const path = require('path');

async function main() {
  const input = process.argv[2];

  if (!input) {
    console.error('Usage: node validate.js <file-or-url>');
    console.error('  node validate.js examples/full.json');
    console.error('  node validate.js https://freecv.org/p/ashley/cv.json');
    process.exit(1);
  }

  // Load the schema
  const schemaPath = path.join(__dirname, 'schema', 'v1.json');
  if (!fs.existsSync(schemaPath)) {
    console.error('❌ Schema not found at schema/v1.json');
    console.error('   Run this script from the cv-json repository root.');
    process.exit(1);
  }
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

  // Load the cv.json (file or URL)
  let data;
  if (input.startsWith('http://') || input.startsWith('https://')) {
    console.log(`📡 Fetching ${input}...`);
    const res = await fetch(input);
    if (!res.ok) {
      console.error(`❌ HTTP ${res.status} — ${res.statusText}`);
      process.exit(1);
    }
    data = await res.json();
  } else {
    if (!fs.existsSync(input)) {
      console.error(`❌ File not found: ${input}`);
      process.exit(1);
    }
    data = JSON.parse(fs.readFileSync(input, 'utf8'));
  }

  // Validate
  let Ajv, addFormats;
  try {
    Ajv = require('ajv');
    addFormats = require('ajv-formats');
  } catch {
    console.error('❌ Missing dependencies. Run: npm install ajv ajv-formats');
    process.exit(1);
  }

  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (valid) {
    console.log('');
    console.log('✅ Valid cv.json');
    console.log('');

    // Print summary
    const b = data.basics || {};
    console.log(`   Name:         ${b.name || '—'}`);
    console.log(`   Title:        ${b.label || '—'}`);
    console.log(`   Location:     ${b.location || '—'}`);
    console.log(`   Work entries:  ${(data.work || []).length}`);
    console.log(`   Skills:        ${(data.skills || []).length}`);
    console.log(`   Education:     ${(data.education || []).length}`);

    if (data.availability) {
      console.log(`   Availability:  ${data.availability.status || '—'}`);
    }
    if (data.ats) {
      console.log(`   YoE:           ${data.ats.yearsOfExperience || '—'}`);
      console.log(`   Seniority:     ${data.ats.seniority || '—'}`);
    }

    console.log('');
  } else {
    console.log('');
    console.log('❌ Invalid cv.json');
    console.log('');
    for (const err of validate.errors) {
      console.log(`   ${err.instancePath || '/'} — ${err.message}`);
    }
    console.log('');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
