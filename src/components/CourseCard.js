const CourseCard = (props) => {
  return (
    <>
      <p>{props.name}</p>
      <p>{props.grd}</p>
      <p>{props.crd}</p>
      <button onClick = {() =>props.del(props.name)} > x </button>
    </>
  );
};

export default CourseCard;
