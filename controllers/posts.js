const express = require("express");
const fs = require("fs");
const path = require("path");

const postsDb = require("../db");

function index (req, res) {

    res.format({
      text: () => {
        res.type("text").send("POSTS");
      },
      html: () => {
       const html = ["<h1>POSTS</h1>"];
    
       html.push("ul");

       for ( post of postsDb ) {
        html.push(`<li>
            <h3>${post.title}<h3/>
            </li>`)
       };

       html.push("</ul>");

       res.send(html.join(""));



      },
      json: () => {
        res.type("json").send({
          message: "POSTS",
        });
      },
      default: () => {
        res.status(406).send("Not Acceptable");
      },
    })
  }

function show (req, res) {

    const postSlug = req.params.slug
    const post = postsDb.find(post => post.slug == postSlug)

    if(!post){
        res.status(404).send("post non trovato");
    }

    res.json(post);
  }

function create (req, res) {
    res.format({
      html: () => {
        res.type("html").send("<h1>Creazione nuovo post</h1>");

      },
      default: () => {
        res.status(406).send("Not Acceptable");
      },
    })
  }

function download (req, res) {

    const postSlug = req.params.slug
    const post = postsDb.find(post => post.slug == postSlug)
    const filePath = path.resolve(__dirname, "..", "public", "imgs", "posts", post.image);

    if(!post){
        res.status(404).send("post non trovato");
    }

    res.download(filePath);

  }



  module.exports = {
    index,
    show,
    create,
    download
  }