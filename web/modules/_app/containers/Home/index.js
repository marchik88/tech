import React from 'react';
import { connect } from 'react-redux';

// Components
import { Flex, Card, Text, Button } from '~/ui';
import Link from 'next/link';

const cardStyle = {
  margin: '5px',
};

const lang = '_app.home';
const costLang = `${lang}.cost`;
const buttonLang = `${lang}.button`;

export default connect(
  ({ languages: { t }, themes: { mt } }) => ({ t, mt }),
  () => ({})
)(({ t = () => {}, mt = () => {} }) => {
  const { 1: costOne, 2: costTwo, 3: costThree } = t(costLang);
  const { buy, details, trial, schedule } = t(buttonLang);

  return (
    <section id="main" role="main">
      <Flex direction="column">
        <Text>Какой-то заголовок или текст</Text>
      </Flex>

      <br />

      <Flex direction="column">
        <iframe
          src="https://www.youtube.com/embed/Ho__D0CU9PY"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: '99.9vw',
            height: '30vh',
          }}
        />
      </Flex>

      <br />

      <Flex direction="column">
        <Text>Ещё один заголовок или текст</Text>
      </Flex>

      <br />

      <Flex direction="row" wrap>
        <Card
          style={{
            ...cardStyle,
            background: mt('backgrounds.card'),
          }}>
          <h2 style={{ color: mt('colors.card') }}>Курс 1</h2>

          <h4 style={{ color: mt('colors.card') }}>{costOne}</h4>

          <Link href="/signin">
            <Button>{buy}</Button>
          </Link>
          <Button>{details}</Button>
          <Button>{trial}</Button>
        </Card>

        <Card
          style={{
            ...cardStyle,
            background: mt('backgrounds.card'),
          }}>
          <h2 style={{ color: mt('colors.card') }}>Курс 2</h2>

          <h4 style={{ color: mt('colors.card') }}>{costTwo}</h4>

          <Link href="/signin">
            <Button>{buy}</Button>
          </Link>
          <Button>{details}</Button>
          <Button>{trial}</Button>
        </Card>

        <Card
          style={{
            ...cardStyle,
            background: mt('backgrounds.card'),
          }}>
          <h2 style={{ color: mt('colors.card') }}>Курс 3</h2>

          <h4 style={{ color: mt('colors.card') }}>{costThree}</h4>

          <Link href="/signin">
            <Button>{buy}</Button>
          </Link>
          <Button>{details}</Button>
          <Button>{trial}</Button>
        </Card>
      </Flex>

      <br />

      <Flex direction="column">
        <Button>{schedule}</Button>
      </Flex>
    </section>
  );
});
