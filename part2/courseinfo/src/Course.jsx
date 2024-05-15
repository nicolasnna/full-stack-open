const Header = ({ label }) => {
  return (
    <h1>{label}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(value => (
        <Part key={value.id} content={value} />
      ))}
      <Total parts={parts}/>
    </div>
  )
}

const Part = ({ content }) => {
  return (
    <p>{content.name} {content.exercises}</p>
  )
}

const Total = ({ parts }) => {
  const totalExcercises = parts.reduce((totalAcumulated, currentValue) => totalAcumulated + currentValue.exercises 
  , 0)

  return (
    <b>total of {totalExcercises} exercises</b>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      {course.map(value => (
        <div key={value.id}>
          <Header label={value.name}/>
          <Content parts={value.parts} />
        </div>
      ))}
    </div>
  )
}

export default Course