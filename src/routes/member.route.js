import express from "express";
import {
  createMember,
  deleteMember,
  getDetailMember,
  getMember,
  updateMember,
} from "../controllers/member.controller.js";
import { body } from "express-validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Member
 *   description: Member CRUD API
 */

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: List of all members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Member"
 */
router.get("/", getMember);

/**
 * @swagger
 * /api/members/{id}:
 *   get:
 *     summary: Get a single member
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Member detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Member"
 *       404:
 *         description: Member not found
 */
router.get("/:id", getDetailMember);

/**
 * @swagger
 * /api/members:
 *   post:
 *     summary: Create new member
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Member"
 *     responses:
 *       201:
 *         description: Member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Member"
 *       400:
 *         description: Validation failed
 */
router.post(
  "/",
  [body("name").notEmpty().withMessage("NAME_IS_REQUIRED")],
  createMember
);

/**
 * @swagger
 * /api/members/{id}:
 *   put:
 *     summary: Update member
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Member"
 *     responses:
 *       200:
 *         description: Member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Member"
 *       404:
 *         description: Member not found
 */
router.put(
  "/:id",
  [body("name").notEmpty().withMessage("NAME_IS_REQUIRED")],
  updateMember
);

/**
 * @swagger
 * /api/members/{id}:
 *   delete:
 *     summary: Delete member
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Member not found
 */
router.delete("/:id", deleteMember);

export default router;
