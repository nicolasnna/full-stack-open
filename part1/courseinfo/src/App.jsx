const Header = (props) => {
  return (
    <h1>{props.text.name}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part content={props.parts[0]}/>
      <Part content={props.parts[1]}/>
      <Part content={props.parts[2]}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.content.name} {props.content.exercises}</p>
  )
}

const Total = (props) => {
  var total = 0
  props.parts.forEach(part => {
    total += part.exercises
  })
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header text={course}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App