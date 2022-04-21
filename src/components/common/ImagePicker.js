/* *****************************************************************************
 Copyright (c) 2020-2021 Wisipsy and/or its affiliates. All rights reserved.
 WISIPSY PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */
import { Button, Modal, Upload } from "antd";

import React from "react";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * When submitting Uploader
 * <code>
 *  if(field === undefined)
 *  "There is no file uploaded"
 *  else if(field.fileList.length === 0)
 *  "The initial file is deleted"
 *  else if(field.fileList.length > 1)
 *  "A new file has been uploaded"
 * </code>
 */
const ImagePicker = (props) => {
  const { value = [], maxCount = 1 } = props;
  const [previewTitle, setPreviewTitle] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewVisible, setPreviewVisible] = React.useState(false);

  const [fileList, setFileList] = React.useState([]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name);
  };

  React.useEffect(() => {
    if (value.length || typeof value === "string") {
      const list = Array.isArray(value)
        ? value.map((url) => {
            return [{ url }];
          })
        : [{ url: value }];
      setFileList(list);
    }
  }, [value]);

  return (
    <>
      <Upload
        accept="image/x-png,image/gif,image/jpeg"
        {...props}
        key={value}
        value={null}
        fileList={fileList}
        onChange={(prop) => {
          setFileList(prop.fileList);
          if(props.onChange)
            props.onChange(prop);
        }}
        defaultFileList={fileList}
        onPreview={handlePreview}
        listType="picture"
        onRemove={(file) => {
          const filtered = fileList.filter((f) => file.uid !== f.uid);
          setFileList(filtered);
        }}
        beforeUpload={(file) => {
          setFileList([...fileList, file]);
          return false;
        }}
        maxCount={maxCount}
      >
        {fileList.length < maxCount && <Button>+ Add</Button>}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImagePicker;
