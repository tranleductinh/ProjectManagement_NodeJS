import express from "express";
import {
  createProject,
  deleteProject,
  getDetailProject,
  getProject,
  updateProject,
} from "../controllers/project.controller.js";
import { body } from "express-validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project CRUD API
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: All projects fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Project"
 */
router.get("/", getProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project details
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 *       404:
 *         description: Project not found
 */
router.get("/:id", getDetailProject);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Project"
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 *       400:
 *         description: Validation or business rule error
 */
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("NAME_IS_REQUIRED"),
    body("owner").notEmpty().withMessage("OWNER_IS_REQUIRED"),
  ],
  createProject
);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Project"
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 *       404:
 *         description: Project not found
 */
router.put("/:id", updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */
router.delete("/:id", deleteProject);

export default router;
