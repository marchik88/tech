import core from '~/../core';

// import plugins
const rematch = core.import.plugin.rematch;
const modules = Object.values(core.import.module);
const models = {};

modules
    .filter(m => m.model)
    .forEach(m => {
        models[m.config.name] = m.model
    });

const Wrapper = rematch.initStore(models);

export default (props) => <Wrapper>{props.children}</Wrapper>;