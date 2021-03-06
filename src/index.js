// Let's import all of our dependencies first.
const derby = require('derby')

// These are components. You can think of them as the building blocks of your app that encapsulate functionality.
const CollaborativeNoteEditor = require('./components/collaborative-note-editor')
const PetDisplayComponent = require('./components/wholesome-component/pet-display-component')
const RacerBasics = require('./components/racer-basics')
const SimpleComponent = require('./components/simple-component')
const WholesomeComponent = require('./components/wholesome-component')

// A Derby app lets us register components, views/templates, and routes.
// Here we are creating an app called 'derby-tutorial'
const app = derby.createApp('derby-tutorial', __filename)

// `derb-debug` is a middleware that lets us do things like inspect data and
// components on the page in the Developer Console.
// More info here: https://github.com/derbyjs/derby-debug
app.use(require('derby-debug'))

// Components are defined as simple Javascript classes.
// You tell Derby that they exist by by calling `app.component(...)`
app.component(CollaborativeNoteEditor)
app.component(PetDisplayComponent)
app.component(RacerBasics)
app.component(SimpleComponent)
app.component(WholesomeComponent)

app.loadViews(__dirname)

// This is a great starting place to examine a component. Visit this route in the browser and look at
// the related source code!
app.get('/simple-component', (page) => {
  page.render(SimpleComponent.prototype.name)
})

app.get('/racer-basics', (page) => {
  page.render(RacerBasics.prototype.name)
})

app.get('/wholesome-component', (page) => {
  page.render(WholesomeComponent.prototype.name)
})

app.get('/collaborative-note-editor', (page, model) => {
  page.redirect(`/collaborative-note-editor/${model.id()}`)
})

app.get('/collaborative-note-editor/:noteId', (page, model, params, next) => {
  CollaborativeNoteEditor.load(model, params, null, (err) => {
    if (err) return next(err)
    page.render(CollaborativeNoteEditor.prototype.name)
  })
})

module.exports = app
