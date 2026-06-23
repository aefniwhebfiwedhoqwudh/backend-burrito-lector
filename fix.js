const mysql = require('mysql2');
const c = mysql.createConnection({
  host: 'mysql-20540ea8-alejandroramirez7981-2f36.l.aivencloud.com',
  port: 20523,
  user: 'avnadmin',
  password: 'AVNS_1nY10CPsDunhJo3zVAj',
  database: 'defaultdb',
  ssl: { rejectUnauthorized: false },
  connectTimeout: 60000
});

c.connect((err) => {
  if (err) { console.log('Error conectando:', err); return; }
  console.log('Conectado!');
  c.query('UPDATE usuarios SET rol="admin" WHERE correo="hola@gmail.com"', (e, r) => {
    console.log(e || r);
    c.end();
  });
});