import Member from "../models/member.model.js";
import mongoose from "mongoose";

export const validateMemberNotFoud = async (_id) => {
  try {
    const member = await Member.findById(_id);
    if (!member) throw { status: 404, message: "MEMBER_NOT_FOUND" };
    return member;
  } catch (error) {
    console.log("validate: ", error);
    throw error;
  }
};

export const validateEmailMemberExists = async (email) => {
  try {
    const member = await Member.findOne({ email: email });
    if (member) throw { status: 404, message: "EMAIL_ALREADY_EXISTS" };
  } catch (error) {
    console.log("validate: ", error);
    throw error;
  }
};

export const validateEmailNotFormat = async (email) => {
  try {
    if (
      email !== "" &&
      email !== null &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false
    ) {
      throw { status: 422, message: "INVALID_EMAIL_FORMAT" };
    }
  } catch (error) {
    console.log("validate: ", error);
    throw error;
  }
};
