import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Containers
import { CodeEditor } from '../CodeEditor';

// Components
import { Card, Button, Flex } from '~/ui';

// Styles
import s from './style.sass';

// Redux
const getDataFromStore = ({
  themes: { mt, themes, theme },
  languages: { t, languages, lang },
}) => ({
  mt,
  t,
  languages,
  lang,
  themes,
  theme,
});
const getMethodsFromStore = ({
  themes: { editThemeSchema, saveTheme },
  languages: { editLanguageSchema, saveLanguage },
}) => ({
  editLanguageSchema,
  saveLanguage,
  editThemeSchema,
  saveTheme,
});

export const SettingsTabs = connect(
  getDataFromStore,
  getMethodsFromStore
)(
  // props
  ({
    t = () => {},
    mt = () => {},
    lang = '',
    theme = '',
    themes = {},
    languages = {},
    saveTheme = () => {},
    saveLanguage = () => {},
    editThemeSchema = () => {},
    editLanguageSchema = () => {},
  }) => {
    const [currentTab, setCurrentTab] = useState(0);

    const tabListNoTitle = [
      { key: 0, tab: 'Themes' },
      { key: 1, tab: 'Languages' },
    ];
    const schemas = [themes, languages];

    const firstSchema = Object.values(schemas[currentTab] || {})[0] || {};
    const secondSchema = Object.values(schemas[currentTab] || {})[1] || {};

    const [fschemeType, fschemeVariation] = (firstSchema.type || '').split('|') || [];
    const [sschemeType, sschemeVariation] = (secondSchema.type || '').split('|') || [];

    const updateScheme = type => text => {
      currentTab === 0
        ? editThemeSchema({ text, type })
        : editLanguageSchema({ text, type });
    };

    return (
      <Flex direction="column" width="100%">
        <Card
          background={mt('backgrounds.card')}
          color={mt('colors.main')}
          className={s.Card}
          tabList={tabListNoTitle}
          activeTabKey={currentTab}
          onTabChange={key => {
            setCurrentTab(key);
          }}>
          <Flex width="100%">
            <Flex direction="column" width="48%">
              <CodeEditor
                scheme={Object.values(schemas[currentTab] || {})[0]}
                updateScheme={updateScheme(fschemeVariation)}
              />
              <Button
                onClick={() => {
                  currentTab === 0
                    ? saveTheme(fschemeVariation)
                    : saveLanguage(fschemeVariation);
                }}>
                Save {fschemeType} {fschemeVariation}
              </Button>
            </Flex>
            <Flex direction="column" width="48%">
              <CodeEditor
                scheme={Object.values(schemas[currentTab] || {})[1]}
                updateScheme={updateScheme(sschemeVariation)}
              />
              <Button
                onClick={() => {
                  currentTab === 0
                    ? saveTheme(sschemeVariation)
                    : saveLanguage(sschemeVariation);
                }}>
                Save {sschemeType} {sschemeVariation}
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    );
  }
);
