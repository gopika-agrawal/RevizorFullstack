const CustomTooltip = ({
  active,
  payload
}) => {

  if (
    active &&
    payload &&
    payload.length
  ) {

    const data =
      payload[0].payload;

    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border">

        <h3 className="font-bold">
          {data.unit}
        </h3>

        <p className="font-semibold text-[#27c7b8]">
          Questions: {data.questionCount}
        </p>

        <div className="mt-2">

          {data.topics?.map(topic => (
            <p
              key={topic}
              className="text-sm"
            >
              • {topic}
            </p>
          ))}

        </div>

      </div>
    );
  }

  return null;
};

export default CustomTooltip;