import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import "./styles.css";

const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Head</th>
          <th>Content</th>
          <th>Tags</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Heading 1</td>
          <td>Content 1</td>
          <td>Tags 1</td>
          <td>
            <MdDelete style={{ color: "#038cfc", cursor: "pointer" }} />
            <CiEdit style={{ color: "#038cfc", cursor: "pointer" }} />
            <FaEye style={{ color: "#038cfc", cursor: "pointer" }} />
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Heading 1</td>
          <td>Content 1</td>
          <td>Tags 1</td>
          <td>
            <MdDelete style={{ color: "#038cfc", cursor: "pointer" }} />
            <CiEdit style={{ color: "#038cfc", cursor: "pointer" }} />
            <FaEye style={{ color: "#038cfc", cursor: "pointer" }} />
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Heading 1</td>
          <td>Content 1</td>
          <td>Tags 1</td>
          <td>
            <MdDelete style={{ color: "#038cfc", cursor: "pointer" }} />
            <CiEdit style={{ color: "#038cfc", cursor: "pointer" }} />
            <FaEye style={{ color: "#038cfc", cursor: "pointer" }} />
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Heading 1</td>
          <td>Content 1</td>
          <td>Tags 1</td>
          <td>
            <MdDelete style={{ color: "#038cfc", cursor: "pointer" }} />
            <CiEdit style={{ color: "#038cfc", cursor: "pointer" }} />
            <FaEye style={{ color: "#038cfc", cursor: "pointer" }} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
