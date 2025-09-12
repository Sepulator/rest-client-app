import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { RequestBodyEditor } from '@/features/rest-client/components/request-body-editor';
import { renderWithProviders } from '@/testing/utils/render-with-providers';
import { renderWithUserEvent } from '@/testing/utils/render-with-user-event';

describe('RequestBodyEditor', () => {
  it('should render with content', () => {
    renderWithProviders(<RequestBodyEditor body="test content" mode="text" />);

    expect(screen.getByText(/test content/)).toBeInTheDocument();
  });

  it('should be read-only', () => {
    renderWithProviders(<RequestBodyEditor body="content" readOnly />);

    const editor = screen.getByRole('textbox');

    expect(editor).toHaveAttribute('contenteditable', 'false');
  });

  it('should display title', () => {
    renderWithProviders(<RequestBodyEditor body="" title="Request Body" />);

    expect(screen.getByText('Request Body')).toBeInTheDocument();
  });

  it('should show prettify button for JSON mode when editable', () => {
    const onChange = vi.fn();

    renderWithProviders(<RequestBodyEditor body='{"test": true}' mode="json" onChange={onChange} />);

    expect(screen.getByRole('button', { name: /prettify/i })).toBeInTheDocument();
  });

  it('should not show prettify button in read-only mode', () => {
    renderWithProviders(<RequestBodyEditor body='{"test": true}' mode="json" readOnly />);

    expect(screen.queryByRole('button', { name: /prettify/i })).not.toBeInTheDocument();
  });

  it('should show error for invalid JSON', () => {
    const invalidJson = '{"invalid": json}';

    renderWithProviders(<RequestBodyEditor body={invalidJson} mode="json" />);

    expect(screen.getByText(/Invalid JSON|Unexpected token/)).toBeInTheDocument();
  });

  it('should prettify JSON when button is clicked', async () => {
    const onChange = vi.fn();
    const { user } = renderWithUserEvent(<RequestBodyEditor body='{"name":"test"}' mode="json" onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /prettify/i }));

    expect(onChange).toHaveBeenCalledWith('{\n  "name": "test"\n}');
  });
});
