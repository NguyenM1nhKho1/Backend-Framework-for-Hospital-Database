import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

type Props = {
  config: any;
  data: any;
  handleEdit: (row: TreatmentFormInputs) => void;
  handleDelete: (row: TreatmentFormInputs) => void;
};

type TreatmentFormInputs = {
  TreatmentID: number;
  TreatmentName: string;
  Description: string | null;
  Cost: number;
};

const Table = ({ config, data, handleEdit, handleDelete }: Props) => {
  const { role } = useAuth();
  const renderedRow = data.map((company: any) => {
    return (
      <tr>
        {config.map((val: any) => {
          if (val.label === "Date")
            return (
              <td className="p-3">
                <Link
                  to={`/medical-record/${company.date}`}
                  className="text-blue-500 underline"
                >
                  {val.render(company)}
                </Link>
              </td>
            );
          return <td className="p-3">{val.render(company)}</td>;
        })}
        {(role === "Admin" || role === "Doctor") && (
          <td className="p-3">
            <button
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightBlue rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              onClick={() => handleEdit(company)}
            >
              Edit
            </button>
          </td>
        )}
        {role === "Admin" && (
          <td className="p-3">
            <button
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              onClick={() => handleDelete(company)}
            >
              Delete
            </button>
          </td>
        )}
      </tr>
    );
  });
  const renderedHeader = config.map((config: any) => {
    return (
      <th
        className="p-4 text-left text-xs font-medium text-fray-500 uppercase tracking-wider"
        key={config.label}
      >
        {config.label}
      </th>
    );
  });
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <table className="min-w-full divide-y divide-gray-200 m-5">
        <thead className="bg-gray-50">{renderedHeader}</thead>
        <tbody>{renderedRow}</tbody>
      </table>
    </div>
  );
};

export default Table;
