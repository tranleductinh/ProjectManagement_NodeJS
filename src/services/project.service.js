import Member from "../models/member.model.js";
import Project from "../models/project.model.js";

export const validateOwnerNotFound = async (ownerId) => {
  try {
    const findOwner = await Member.findById(ownerId);
    if (!findOwner) {
      throw { status: 404, message: "OWNER_NOT_FOUND" };
    }
  } catch (error) {
    console.log("validate: ", error);
    throw error;
  }
};

export const validateMemberNotFoud = async (memberId) => {
  try {
    console.log("MEMBERS ID: ", memberId);
    await Promise.all(
      memberId.map(async (member) => {
        const findMember = await Member.findById(member);
        if (!findMember) throw { status: 404, message: "MEMBER_NOT_FOUND" };
      })
    );
  } catch (error) {
    console.log("validate: ", error);
    throw error;
  }
};

export const validateProjectNotFound = async (projectId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) throw { status: 404, message: "PROJECT_NOT_FOUND" };
    return project;
  } catch (error) {
    console.log("validate: ", error);
    throw error;
  }
};

export const validateMemberNotEqualOwner = async (ownerId, memberId) => {
  try {
    memberId.map((member) => {
      console.log("owner - member:", {ownerId, member})
      if (member == ownerId)
        throw { status: 409, message: "MEMBER_NOT_EQUAL_OWNER" };
    });
  } catch (error) {
    console.log("validate: ", error);
    throw error;
  }
};

export const validateMemberNotEqualMember = async (memberId) => {
  try {
    let check = 0;
    for (let i = 0; i < memberId.length; i++) {
      for (let j = memberId.length; j > i ; j--) {
        if (memberId[i] === memberId[j]) check++;
        if (check === 1)
          throw { status: 409, message: "MEMBER_NOT_EQUAL_MEMBER" };
      }
    }
  } catch (error) {
    console.log("validate: ", error);
    throw error;
  }
};
