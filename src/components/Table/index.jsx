import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const ITEMS_PER_PAGE = 5;

/**
 * Table component for displaying data in a paginated table format.
 * @param {Object} props - Component properties.
 * @param {number} props.startIndex - The starting index for the current page of data.
 * @param {Array} props.data - The complete dataset to be displayed.
 * @returns {JSX.Element} The rendered table component.
 */
const Table = ({ startIndex, data }) => {
  // Calculate the items to display on the current page
  const currentItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="table-container">
      <table>
        {/* Table header component */}
        <TableHeader data={data} />
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="9">No results found</td>
            </tr>
          ) : (
            // Map through the current items and render TableRow for each item
            currentItems.map((item) => <TableRow key={item.id} item={item} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

// Define prop types for the component
Table.propTypes = {
  startIndex: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      phone_numbers: PropTypes.string,
      email: PropTypes.string,
      location: PropTypes.string,
      region: PropTypes.string,
      linkedin: PropTypes.string,
      skills: PropTypes.string,
      total_experience: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })
  ).isRequired,
};

Table.displayName = "Table";
export default Table;
