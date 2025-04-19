// import { Schema, model } from 'mongoose';

// const postSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     content: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const Post = model('Post', postSchema);

// export default Post;

// models/PostModel.js
import ddbDocClient from "../config/dynamo.js";
import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "Posts";

export const createPost = async ({ title, content }) => {
  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: newPost,
  });

  await ddbDocClient.send(command);
  return newPost;
};

export const getPosts = async () => {
  const command = new ScanCommand({ TableName: TABLE_NAME });
  const { Items } = await ddbDocClient.send(command);
  return Items;
};

export const getPostById = async (id) => {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id },
  });

  const { Item } = await ddbDocClient.send(command);
  return Item;
};

export const updatePost = async (id, { title, content }) => {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: "set title = :t, content = :c, updatedAt = :u",
    ExpressionAttributeValues: {
      ":t": title,
      ":c": content,
      ":u": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  });

  const { Attributes } = await ddbDocClient.send(command);
  return Attributes;
};

export const deletePost = async (id) => {
  const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { id },
  });

  await ddbDocClient.send(command);
  return { message: `Post ${id} deleted.` };
};
