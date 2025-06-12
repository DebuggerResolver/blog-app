
import { useItems } from '../../context/ItemsContext';

const Table = () => {
  const { items } = useItems();

  return (
    <table
      style={{
        width: '80%',
        margin: '2rem auto',
        borderCollapse: 'collapse',
        border: '1px solid #ccc',
      }}
    >
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Header</th>
          <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Content</th>
          <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Tags</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{item.head}</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{item.content}</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;