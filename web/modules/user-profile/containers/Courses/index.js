import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Components
import { Button, Card, Drawer, Text } from '~/ui';

// Styles
import s from './style.sass';

// Redux
const getDataFromStore = ({
  userProfile: { courses },
  themes: { mt },
  languages: { t, lang },
}) => ({
  courses,
  mt,
  t,
  lang,
});
const getMethodsFromStore = ({ userProfile: { setCourses, getAllCourses } }) => ({
  setCourses,
  getAllCourses,
});

/**
 * Component
 */
export default connect(
  getDataFromStore,
  getMethodsFromStore
)(
  // props
  ({
    courses = [],
    setCourses = () => {},
    getAllCourses = () => {},
    lang = '',
    mt = () => {},
    t = () => {},
  }) => {
    const [contentListNoTitle, setContentListNoTitle] = useState({});
    const [actualCourses, setActualCourses] = useState([]);
    const [drawerShow, setDrawerShow] = useState(false);
    const [drawerContent, setDrawerContent] = useState({});

    const [tabState, setTabState] = useState({
      noTitleKey: '',
    });

    useEffect(() => {
      let _actualCourses = lang === 'ru' ? courses.ruCourses : courses.enCourses;
      if (!tabState.noTitleKey)
        setTabState({ noTitleKey: (_actualCourses[0] || {}).key });
      setActualCourses(_actualCourses);
      let tempContent = {};
      (_actualCourses || []).map(
        k =>
          (tempContent[k.key] = {
            content: k.content,
            title: k.title,
            plan: k.plan,
            discount: k.discount,
          })
      );
      setContentListNoTitle(tempContent);
    }, [lang]);
    useEffect(() => {
      getAllCourses();
    }, []);

    const onTabChange = (key, type) => {
      setTabState({ [type]: key });
    };
    const openDrawer = content => {
      setDrawerContent(content);
      setDrawerShow(!drawerShow);
    };

    return (
      <>
        <Card
          className={s.Card}
          headStyle={{ width: '100%', minHeight: '57px' }}
          bodyStyle={{ width: '100%' }}
          background={mt('backgrounds.card')}
          color={mt('colors.card')}
          // cover={<>header</>}
          tabList={actualCourses}
          activeTabKey={tabState.noTitleKey}
          // tabBarExtraContent={<a href="#">More</a>}
          actions={[
            <Text onClick={() => openDrawer('intro')} key="Intro">
              {t('userProfile.button.intro')}
            </Text>,
            <Text onClick={() => openDrawer('first lesson')} key="firstLesson">
              {t('userProfile.button.toFirstLesson')}
            </Text>,
            <Text onClick={() => openDrawer('lust test')} key="lustTest">
              {t('userProfile.button.toLustTest')}
            </Text>,
            <Text onClick={() => openDrawer('progress')} key="progress">
              {t('userProfile.button.progress')}
            </Text>,
          ]}
          onTabChange={key => {
            onTabChange(key, 'noTitleKey');
          }}>
          <Card
            type="meta"
            className={s.Meta}
            background={mt('backgrounds.card')}
            color={mt('colors.card')}
            // avatar={<img width='100px' height='100px' alt="без обложки" src={contentListNoTitle[tabState.noTitleKey].avatar} />}
            title={
              <h3 style={{ color: mt('colors.card') }}>
                {(contentListNoTitle[tabState.noTitleKey] || {}).title || ''}
              </h3>
            }
            description={
              <>
                <Text color={mt('colors.card')}>
                  {(contentListNoTitle[tabState.noTitleKey] || {}).content || ''}
                </Text>
                <br />
                <br />
                <Text color={mt('colors.card')}>
                  {(contentListNoTitle[tabState.noTitleKey] || {}).plan || ''}
                </Text>
              </>
            }
          />
          <p>
            <Button
              onClick={() =>
                openDrawer((contentListNoTitle[tabState.noTitleKey] || {}).discount) || ''
              }>
              {t('userProfile.button.discount')}
            </Button>
          </p>
        </Card>
        <Drawer
          title="Basic Drawer"
          placement="left"
          closable={false}
          onClose={() => setDrawerShow(!drawerShow)}
          visible={drawerShow}>
          <p>{drawerContent}</p>
        </Drawer>
      </>
    );
  }
);
