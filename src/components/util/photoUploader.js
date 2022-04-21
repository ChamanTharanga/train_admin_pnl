/* *****************************************************************************
 Copyright (c) 2020-2021 Wisipsy and/or its affiliates. All rights reserved.
 WISIPSY PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { ref, uploadBytes } from "firebase/storage";
import {v4 as uuidV4} from 'uuid';
import mime from "mime-types";
import { firebaseStorage } from "../../config/firebaseConfig";

/**
 *
 * @param {File} photo
 * @param {string} directory
 */
const uploadFile = async (file, directory) => {
  if (!file) return undefined;
  const generated = generateFileName(file.name);
  const storageRef = ref(firebaseStorage, `${directory}/${generated}`);
  
  await uploadBytes(storageRef, file, {
    contentType: mime.contentType(generated),
  });
  return storageRef.fullPath;
};

/**
 *
 * @param {string} fileName
 */
const generateFileName = (fileName) => {
  /** @type {string[]} */
  const array = fileName.split(".");
  const extension = array[array.length - 1];
  const name = uuidV4();
  return `${name}.${extension}`;
};

export default { uploadFile };
