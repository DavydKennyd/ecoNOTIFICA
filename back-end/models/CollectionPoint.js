const pool = require('../config/db');

class CollectionPoint {
  static async create(data) {
    const query = `
      INSERT INTO collection_points (user_id, name, address, reference, material_type, responsible_name, contact_info, media_url, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [
      data.user_id, 
      data.name, 
      data.address, 
      data.reference,
      data.material_type, 
      data.responsible_name, 
      data.contact_info,
      data.media_url, 
      data.description
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findAll() {
    const query = `
      SELECT cp.*, u.username 
      FROM collection_points cp
      JOIN users u ON cp.user_id = u.id;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = CollectionPoint;