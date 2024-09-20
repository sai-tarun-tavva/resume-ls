import React from "react";
import PropTypes from "prop-types";

/**
 * TableRow component renders a single row in the table.
 * @param {Object} props - Component properties.
 * @param {Object} props.item - The data object to be displayed in the row.
 * @returns {JSX.Element} The rendered table row.
 */
const TableRow = ({ item }) => (
  <tr>
    <td>{item.id || "N/A"}</td>
    <td>{item.name || "N/A"}</td>
    <td>{item.phone_numbers || "N/A"}</td>
    <td>{item.email || "N/A"}</td>
    <td>{item.location || "N/A"}</td>
    <td>{item.region || "N/A"}</td>
    <td>{item.linkedin || "N/A"}</td>
    <td>{item.skills || "N/A"}</td>
    <td>{item.total_experience || "N/A"}</td>
  </tr>
);

// Define prop types for the component
TableRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    phone_numbers: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    region: PropTypes.string,
    linkedin: PropTypes.string,
    skills: PropTypes.string,
    total_experience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

TableRow.displayName = "TableRow";
export default TableRow;
