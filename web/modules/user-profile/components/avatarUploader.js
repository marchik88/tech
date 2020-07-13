import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { Upload, Message } from '~/ui';
export default connect(
  ({ userProfile: { avatar } }) => ({
    avatar,
  }),
  ({ userProfile: { setAvatar } }) => ({
    setAvatar,
  })
)(
  ({
    setAvatar = () => {},
  }) => {
    const [fileData, setFileData] = useState({ loading: false });
    function getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        Message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        Message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    }

    const handleChange = info => {
      if (info.file.status === 'uploading') {
        setFileData({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          setFileData({
            imageUrl,
            loading: false,
          });
          setAvatar(imageUrl);
        });
      }
    };

    const uploadButton = (
      <div>
        {fileData.loading ? <LoadingOutlined /> : <PlusOutlined />}
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        style={{ width: '128px', height: '128px' }}
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}>
        {fileData.imageUrl ? (
          <img src={fileData.imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
);
