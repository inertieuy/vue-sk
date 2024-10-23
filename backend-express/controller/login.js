const express = require("express");

const { validationResult } = require("express-validator");

const prisma = require("../prisma/client");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "validation eror",
      errors: errors.array(),
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "password is incorrect",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.jwt, {
      expiresIn: "1h",
    });

    const { password, ...userWithoutPassword } = user;

    res.status(200).send({
      success: true,
      message: "login success",
      data: {
        user: userWithoutPassword,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports = login;
