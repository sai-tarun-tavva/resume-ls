import React from "react";

/**
 * TableHeader component renders the header row for the table.
 * @returns {JSX.Element} The rendered table header.
 */
const TableHeader = () => (
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Phone Numbers</th>
      <th>Email</th>
      <th>Location</th>
      <th>Region</th>
      <th>LinkedIn</th>
      <th>Skills</th>
      <th>Total Experience</th>
    </tr>
  </thead>
);

TableHeader.displayName = "TableHeader";
export default TableHeader;
