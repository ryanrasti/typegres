export const PocWarning = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <p className="text-yellow-700">
        <strong>Note:</strong> Typegres is currently in early development, so expect many rough edges, breaking changes,
        and incomplete features. However, it is already usable for many common tasks and we welcome contributions!
      </p>
    </div>
  );
}