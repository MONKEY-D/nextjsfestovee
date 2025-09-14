import React, { useEffect, useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Fuse from "fuse.js";
import searchData from "@/lib/search";

const options = {
  keys: ["label", "description", "keywords"],
  threshold: 0.3,
};

const SearchModel = ({ open, setOpen }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fuse = useMemo(() => new Fuse(searchData, options), []);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const res = fuse.search(query);
    setResults(res.map((r) => r.item));
  }, [query, fuse]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick Search</DialogTitle>
          <DialogDescription>
            Find and navigate to any admin section instantly. Type a keyword to
            get started.
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />

        <ul className="mt-4 max-h-60 overflow-y-auto">
          {results.map((item, index) => (
            <li key={item.url || index}>
              <Link
                onClick={() => setOpen(false)}
                href={item.url}
                className="block py-2 px-3 rounded hover:bg-muted"
              >
                <h4 className="font-medium">{item.label}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}

          {query && results.length === 0 && (
            <div className="text-sm text-center text-muted-foreground">
              No results found
            </div>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModel;
