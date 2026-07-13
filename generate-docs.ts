import fs from 'fs';
import path from 'path';

const schemaDir = path.join(__dirname, 'prisma', 'schema');
const routesDir = path.join(__dirname, 'server', 'routes');
const controllersDir = path.join(__dirname, 'server', 'controllers');

let markdown = '# GROVO - Frontend API & Data Reference\n\n';
markdown += 'This document provides a comprehensive reference for all database models, API routes, and controllers available in the GROVO backend.\n\n';

// 1. Parse Schemas
markdown += '## 📊 Database Models (Prisma Schemas)\n\n';
try {
  const schemaFiles = fs.readdirSync(schemaDir).filter(f => f.endsWith('.prisma'));
  
  const models: Record<string, string[]> = {};
  
  for (const file of schemaFiles) {
    const content = fs.readFileSync(path.join(schemaDir, file), 'utf-8');
    const modelRegex = /model\s+(\w+)\s+{([^}]+)}/g;
    let match;
    while ((match = modelRegex.exec(content)) !== null) {
      const modelName = match[1];
      const modelBody = match[2];
      
      const fields = modelBody.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('@@') && !line.startsWith('//'))
        .map(line => {
           const parts = line.split(/\s+/);
           return `- **${parts[0]}**: \`${parts[1]}\``;
        });
        
      models[modelName] = fields;
    }
  }

  // Group models by their file or just list them alphabetically
  Object.keys(models).sort().forEach(modelName => {
    markdown += `### ${modelName}\n\n`;
    markdown += models[modelName].join('\n') + '\n\n';
  });
  
} catch (e) {
  console.error('Error parsing schemas:', e);
}

// 2. Parse Routes
markdown += '## 🛣️ API Routes\n\n';
try {
  const routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith('.ts'));
  
  for (const file of routeFiles) {
    const content = fs.readFileSync(path.join(routesDir, file), 'utf-8');
    markdown += `### \`${file}\`\n\n`;
    
    const lines = content.split('\n');
    const routeRegex = /router\.(get|post|put|patch|delete)\(['"]([^'"]+)['"]/;
    
    const routes = [];
    for (const line of lines) {
      const match = routeRegex.exec(line);
      if (match) {
        routes.push(`- **${match[1].toUpperCase()}** \`${match[2]}\``);
      }
    }
    
    if (routes.length > 0) {
      markdown += routes.join('\n') + '\n\n';
    } else {
      markdown += '_No explicit routes found via regex (might be using controllers directly)._\n\n';
    }
  }
} catch (e) {
  console.error('Error parsing routes:', e);
}

fs.writeFileSync(path.join(__dirname, 'FRONTEND_API_REFERENCE.md'), markdown);
console.log('Successfully generated FRONTEND_API_REFERENCE.md');
