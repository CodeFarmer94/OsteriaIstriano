import React from 'react';
import { render } from '@testing-library/react';
import Home from '../components/home/Home.js';

describe('Home Component', () => {
  it('renders main section with title', () => {
    const { getByText } = render(<Home />);
    const titleElement = getByText("L'Osteria Istriano: Ristorantino di pesce sulle rive di Trieste!");
    expect(titleElement).toBeInTheDocument();
  });

  it('renders delivery section with order link', () => {
    const { getByText } = render(<Home />);
    const orderLink = getByText('Visualizza il Menù per ordinare!');
    expect(orderLink).toBeInTheDocument();
  });

  // Add more test cases for other parts of the component
  // ... you can use getByText, getByAltText, getByTestId, etc.
});
