import Member from "../models/member.model.js";
import { success, error } from "../utils/response.js";
import { validationResult } from "express-validator";
import {
  validateMemberNotFoud,
  validateEmailMemberExists,
  validateEmailNotFormat,
} from "../services/member.service.js";

export const createMember = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return error(res, "Validation failed", 400, errors.array());
    await validateEmailNotFormat(req.body.email);
    await validateEmailMemberExists(req.body.email);
    const member = await Member.create(req.body);
    success(res, "Member created successfully", member);
  } catch (err) {
    if (err && err.status && err.message) {
      return error(res, "Member created failed", err.status, err.message);
    }
    error(res, err.message);
  }
};

export const updateMember = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return error(res, "Validation failed", 400, errors.array());
    await validateEmailMemberExists(req.body.email);
    await validateMemberNotFoud(req.params.id);
    await validateEmailNotFormat(req.body.email);
    const member = await Member.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
    });
    success(res, "Member updated successfully", member);
  } catch (err) {
    error(res, err.message);
  }
};

export const deleteMember = async (req, res) => {
  try {
    await validateMemberNotFoud(req.params.id);
    const member = await Member.findByIdAndDelete(req.params.id);
    success(res, "Member deleted successfully", member);
  } catch (err) {
    if (err && err.status && err.message) {
      return error(res, "Member deleted failed", err.status, err.message);
    }
    error(res, err.message);
  }
};

export const getDetailMember = async (req, res) => {
  try {
    const member = await validateMemberNotFoud(req.params.id);
    success(res, "Member fetched successfully", member);
  } catch (err) {
    if (err && err.status && err.message) {
      return error(res, "Member get detail failed", err.status, err.message);
    }
    error(res, err.message);
  }
};

export const getMember = async (req, res) => {
  try {
    const member = await Member.find();
    success(res, "Members fetched successfully", member);
  } catch (err) {
    error(res, err.message);
  }
};
