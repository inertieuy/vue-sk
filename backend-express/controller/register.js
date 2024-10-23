const express = require("express");
const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");

const prisma = require("../prisma/client");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "validation eror",
      errors: errors.array(),
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
module.exports = register;
