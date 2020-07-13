import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

// Components
import { Card, Avatar, Input, Button, Text, Spin } from '~/ui';
import AvatarUploader from '../../components/avatarUploader';

// Icons
import { UserOutlined } from '@ant-design/icons';

// Styles
import s from './style.sass';

// Redux
const getDataFromStore = ({
  userProfile: { profileInfo, avatar },
  themes: { mt },
  languages: { t, lang },
}) => ({
  profileInfo,
  mt,
  t,
  lang,
  avatar,
});
const getMethodsFromStore = ({ userProfile: { editProfileInfo, getProfileInfo } }) => ({
  editProfileInfo,
  getProfileInfo,
});

/**
 * Component
 */
export default connect(
  getDataFromStore,
  getMethodsFromStore
)(
  withRouter(
    // props
    ({
      avatar = '',
      router = {},
      profileInfo = {},
      t = () => {},
      mt = () => {},
      getProfileInfo = () => {},
      editProfileInfo = () => {},
    }) => {
      const [edit, setEdit] = useState(false);
      const [localData, setLocalData] = useState({});

      const updateField = fieldName => e => {
        setLocalData({
          ...localData,
          [fieldName]: e.target ? e.target.value : e,
        });
      };

      useEffect(() => {
        getProfileInfo();
      }, []);

      const goToAdminPanel = () => router.push('/admin');

      return (
        <>
          <Card
            className={s.Card}
            headStyle={{ width: '100%', minHeight: '57px' }}
            bodyStyle={{ width: '100%', minHeight: '410px' }}
            background={mt('backgrounds.card')}
            color={mt('colors.card')}
            cover={
              <div style={{ marginTop: '30px' }}>
                {edit ? (
                  <AvatarUploader />
                ) : (
                  <Avatar icon={<UserOutlined />} size={150} src={profileInfo.avatar} />
                )}
              </div>
            }
            actions={[
              <Text
                onClick={() => {
                  if (edit) {
                    editProfileInfo(localData);
                    setEdit(false);
                  }
                }}
                key="save">
                {t('userProfile.button.save')}
              </Text>,
              <Text onClick={() => setEdit(!edit)} key="edit">
                {t('userProfile.button.edit')}
              </Text>,
              <Text onClick={() => console.log('soon')} key="teacherConnect">
                {t('userProfile.button.teacherConnect')}
              </Text>,
            ]}>
            <p>
              {edit ? (
                <Input
                  name="name"
                  id="name"
                  defaultValue={profileInfo.firstName}
                  placeholder={t('userProfile.input.name')}
                  value={localData.firstName}
                  onChange={updateField('firstName')}
                />
              ) : (
                `${t('userProfile.label.firstName')}: ` +
                (profileInfo.firstName || <Spin />)
              )}
            </p>
            <p>
              {edit ? (
                <Input
                  name="name"
                  id="lastName"
                  defaultValue={profileInfo.lastName}
                  placeholder={t('userProfile.input.last-name')}
                  value={localData.lastName}
                  onChange={updateField('lastName')}
                />
              ) : (
                `${t('userProfile.label.lastName')}: ` +
                (profileInfo.lastName || <Spin />)
              )}
            </p>

            {!edit ? <a>@telegram</a> : ''}

            <p>
              {((!edit && profileInfo.role === 'admin') ||
                profileInfo.role === 'teacher') && (
                <>
                  <br />
                  <Button onClick={goToAdminPanel}>
                    {t('userProfile.button.controlPanel')}
                  </Button>
                </>
              )}
            </p>
          </Card>
        </>
      );
    }
  )
);
