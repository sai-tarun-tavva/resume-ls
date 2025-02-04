import PropTypes from "prop-types";
import { useState } from "react";
import Loader from "../../../Atoms/components/Loader";
import NoRecords from "../../../Atoms/components/NoRecords";
import Checkbox from "../../../Atoms/components/Inputs/Checkbox";
import Tooltip from "../../../Atoms/components/Tooltip";
import { useLoading } from "../../../../store";
import { LOADING_ACTION_TYPES } from "../../../../constants";
import classes from "./index.module.scss";

const { APP } = LOADING_ACTION_TYPES;

/**
 * Table Component
 *
 * Renders a table with headers, body, and status filters. Handles displaying a loading state,
 * a "no records" message, and filtering logic for statuses.
 *
 * @param {Object} props - Props for the Table component.
 * @param {Array} props.statusFilterOptions - Array of status filter options with `value` and `label` properties.
 * @param {Function} props.TableHeader - React component or function rendering the table headers.
 * @param {Function} props.TableBody - React component or function rendering the table body rows.
 * @param {number} props.rowsLength - Number of rows in the table body.
 * @param {Function} props.handleStatusFilterClick - Function to apply the status filters.
 * @param {Function} props.toggleStatusFilter - Function to toggle the selected statuses.
 * @param {Object} props.selectedStatuses - Object with the selected statuses.
 * @param {string} props.extraClass - Optional additional CSS classes for custom styling.
 * @returns {JSX.Element} The rendered Table component.
 */
const Table = ({
  statusFilterOptions,
  TableHeader,
  TableBody,
  rowsLength,
  handleStatusFilterClick,
  toggleStatusFilter,
  selectedStatuses,
  extraClass = "",
}) => {
  const { isLoading } = useLoading();
  const [isStatusDropdownVisible, setIsStatusDropdownVisible] = useState(false);

  return (
    <div className={`${classes.tableContainer} ${extraClass}`}>
      {isLoading[APP] ? (
        <Loader /> // Show loader if data is being fetched
      ) : (
        <Tooltip
          extraClass={classes.tooltipTableExtraClass}
          trigger="pause-hover"
          avoidDisplay={isStatusDropdownVisible}
          baseContentToHover={
            <table className={classes.table}>
              {/* Table headers */}
              <thead>
                <tr>
                  <th style={{ width: "10rem" }}>
                    Status
                    <Tooltip
                      extraClass={classes.tooltipStatusExtraClass}
                      baseContentToHover={
                        <i
                          className={`bi bi-caret-down-fill ${classes.filterIcon}`}
                          onMouseEnter={() => setIsStatusDropdownVisible(true)}
                          onMouseLeave={() => setIsStatusDropdownVisible(false)}
                        />
                      }
                    >
                      <div
                        className={classes.statusDropdown}
                        onMouseEnter={() => setIsStatusDropdownVisible(true)}
                        onMouseLeave={() => setIsStatusDropdownVisible(false)}
                      >
                        <div>
                          {statusFilterOptions.map(({ value, label }) => (
                            <div key={value} className={classes.label}>
                              <Checkbox
                                id={value}
                                label=""
                                checked={selectedStatuses[value]}
                                value={selectedStatuses[value]}
                                changeHandler={() => toggleStatusFilter(value)}
                                extraClass={classes.checkboxExtraClass}
                              />
                              {label}
                            </div>
                          ))}
                        </div>
                        <span
                          onClick={() => {
                            setIsStatusDropdownVisible(false);
                            handleStatusFilterClick();
                          }}
                        >
                          Apply
                        </span>
                      </div>
                    </Tooltip>
                  </th>

                  <TableHeader />
                </tr>
              </thead>

              {/* Table body displaying candidate data */}
              {rowsLength === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="21" className={classes.noRecordContainer}>
                      <NoRecords />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <TableBody />
              )}
            </table>
          }
        >
          <span className={classes.tooltipContent}>
            Double click on a row to edit the record.
          </span>
        </Tooltip>
      )}
    </div>
  );
};

/**
 * PropTypes validation for the Table component.
 */
Table.propTypes = {
  statusFilterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  TableHeader: PropTypes.elementType.isRequired,
  TableBody: PropTypes.elementType.isRequired,
  rowsLength: PropTypes.number.isRequired,
  handleStatusFilterClick: PropTypes.func.isRequired,
  toggleStatusFilter: PropTypes.func.isRequired,
  selectedStatuses: PropTypes.objectOf(PropTypes.bool).isRequired,
  extraClass: PropTypes.string,
};

Table.displayName = "Table";
export default Table;
