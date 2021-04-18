export async function loadPage(
  pageNumber,
  shouldRefresh = false,
  total,
  setLoading,
  setTotal,
  setFeed,
  setPage,
  feed
) {
  if (total && pageNumber > total) return;

  setLoading(true);

  // eslint-disable-next-line no-undef
  const response = await fetch(
    `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`
  );

  const data = await response.json();
  const totalItems = response.headers.get('X-Total-Count');

  setTotal(Math.floor(totalItems / 5));
  setFeed(shouldRefresh ? data : [...feed, ...data]);
  setPage(pageNumber + 1);
  setLoading(false);
}
