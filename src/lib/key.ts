export async function generateKey(
  length: number,
  linkKeyValueStore: KVNamespace
) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  if (await getKey(result, linkKeyValueStore)) {
    return generateKey(length + 1, linkKeyValueStore);
  }

  return result;
}

export async function getKey(key: string, linkKeyValueStore: KVNamespace) {
  const link = await linkKeyValueStore.get(key);

  if (link === null) {
    return false;
  }

  return link;
}

export async function existingLinkCheck(
  link: string,
  reverseLinkKeyValueStore: KVNamespace
) {
  const keys = (await reverseLinkKeyValueStore.list()).keys;

  for (const key of keys) {
    if (key.name === link) {
      const value = await reverseLinkKeyValueStore.get(key.name);
      return value;
    }
  }

  return false;
}