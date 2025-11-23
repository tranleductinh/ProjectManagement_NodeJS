import Project from "../models/project.model.js";
import { success, error } from "../utils/response.js";
import { validationResult } from "express-validator";
import {
  validateMemberNotFoud,
  validateOwnerNotFound,
  validateProjectNotFound,
  validateMemberNotEqualOwner,
  validateMemberNotEqualMember,
} from "../services/project.service.js";

export const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return error(res, "Validation failed", 400, errors.array());
    await validateOwnerNotFound(req.body.owner);
    console.log("MEMBERS: ", req.body.members);
    await validateMemberNotFoud(req.body.members);
    await validateMemberNotEqualOwner(req.body.owner, req.body.members);
    await validateMemberNotEqualMember(req.body.members);
    const project = await Project.create(req.body);
    success(res, "Project created successfully", project);
  } catch (err) {
    if (err && err.status && err.message)
      return error(res, "Project created failed", err.status, err.message);
    error(res, err.message);
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.find();
    success(res, "Projects fetched successfully", project);
  } catch (err) {
    error(res, err.message);
  }
};

export const getDetailProject = async (req, res) => {
  try {
    const project = await validateProjectNotFound(req.params.id);
    success(res, "Project fetched successfully", project);
  } catch (err) {
    if (err && err.status && err.message)
      return error(res, "Project get details failed", err.status, err.message);
    error(res, err.message);
  }
};

export const updateProject = async (req, res) => {
  try {
    await validateProjectNotFound(req.params.id);
    await validateOwnerNotFound(req.body.owner);
    await validateMemberNotFoud(req.body.members);
    await validateMemberNotEqualOwner(req.body.owner, req.body.members);
    await validateMemberNotEqualMember(req.body.members);
    const project = await Project.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      owner: req.body.owner,
      members: req.body.members,
    });
    success(res, "Project updated successfully", project);
  } catch (err) {
    if (err && err.status && err.message)
      return error(res, "Project update failed", err.status, err.message);
    error(res, err.message);
  }
};

export const deleteProject = async (req, res) => {
  try {
    await validateProjectNotFound(req.params.id);
    const project = await Project.findByIdAndDelete(req.params.id);
    success(res, "Project deleted successfully", project);
  } catch (err) {
    if (err && err.status && err.message)
      return error(res, "Project deleted failed", err.status, err.message);
    error(res, err.message);
  }
};
