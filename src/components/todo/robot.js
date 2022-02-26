import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeRobot, updateRobot } from "../../redux/robots/action-creators";
import { remove, update } from "../../services/api";

export function Robot({ robot }) {
  const dispatch = useDispatch();

  const deleteRobot = (robot) => {
    remove(robot._id).then((resp) => {
      if (resp.statusText.toLowerCase() === "ok") {
        dispatch(removeRobot(robot));
      }
    });
  };
  const toggleRobot = (robot) => {
    update(robot).then((resp) => {
      dispatch(updateRobot(resp.data));
    });
  };

  function handleClick() {
    deleteRobot(robot);
  }

  function handleChange() {
    toggleRobot({ ...robot, isCompleted: !robot.isCompleted });
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={robot.isCompleted}
        onChange={handleChange}
      />
      <Link to={`/detail/${robot.id}`}>
        <span className={robot.isCompleted ? "task-completed" : ""}>
          {robot.name}
        </span>{" "}
        -<span>{robot.speed}</span>-<span>{robot.stamina}</span>-
        <span>{robot.date}</span>
        <div>
          <img src={`${robot.image}`} alt="killer-robot" />
        </div>
      </Link>

      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyPress={handleClick}
      >
        🗑️
      </div>
    </li>
  );
}

/* export function Task({task, deleteTask}) {
    return (
        <li>
            <div>{task}</div>
        </li>
    );
} */
