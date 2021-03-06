const express = require('express');
const router = express.Router();

const pool = require('../database');
const { route } = require('.');

router.get('/add', (req,res) => {
    res.render('links/add');
});

router.post('/add', async (req,res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('message', 'Link saved successfully');
    res.redirect('/links');
});

router.get('/', async (req,res) => {
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    res.render('links/list', { links });
});

router.get('/delete/:id', async (req,res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('message', 'Link deleted successfully');
    res.redirect('/links');
});

router.get('/edit/:id', async (req,res) => {
    const { id } = req.params;
    const link = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: link[0]});
});

router.post('/edit/:id', async (req,res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    console.log(newLink)
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('message', 'Link updated successfully');
    res.redirect('/links');
});

module.exports = router;

