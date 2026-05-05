// ProductResult — displays the output of a product action in a muted code-style box.

export interface ProductResultProps {
  /** The result string to display */
  result: string;
}

export default function ProductResult({ result }: ProductResultProps) {
  return (
    <div className="oq-product-result rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-[var(--space-4x)]">
      <p className="text-[var(--text-xs)] font-medium text-[var(--color-text-muted)] mb-[var(--space-2x)]">Result</p>
      <pre className="text-[var(--text-sm)] whitespace-pre-wrap font-[var(--font-mono)] text-[var(--color-text)]">{result}</pre>
    </div>
  );
}
