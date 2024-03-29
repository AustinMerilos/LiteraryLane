import { resetIdCounter, useCombobox } from "downshift";
import React from "react";

import { DropDown, DropDownItem, SearchStyles } from "../styles/dropDown";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import debounce from "lodash/debounce";

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: "no-cache",
    }
  );
  const items = data?.searchTerms || [];
  const findItemsDebounce = debounce(findItems, 350);
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsDebounce({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/book/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || "",
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for a Book",
            id: "search",
            className: loading ? "loading" : null,
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item, index })}
              key={item.id}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>No titles found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
