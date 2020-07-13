import React from 'react';
import App from 'next/app';
// init modules and plugins
import '~/plugins';
import '~/modules';
// Custom containers
import StoreWrapper from '../StoreWrapper';
import MetaData from '../MetaData';
import Header from '../Header';
import { SideBar } from '../SideBar';
import Footer from '../Footer';
import MainBodyWrapper from './MainBodyWrapper';
// Utils
import '~/utils/consoleHandler';
//style
import s from './style.sass';

export default class AppWrapper extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <StoreWrapper>
        <main style={{ display: 'flex', flexDirection: 'column' }}>
          <MetaData />
          <Header />
          <SideBar />
          <MainBodyWrapper className={s.Wrapper}>
            <Component {...pageProps} />
          </MainBodyWrapper>
          <Footer />
        </main>
      </StoreWrapper>
    );
  }
}
