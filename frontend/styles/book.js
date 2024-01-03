import styled from "styled-components";

export const BookListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 100px;
  padding: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 500px;
    grid-gap: 50px;
  }
`;

export const BookItem = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  position: relative;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.5;
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  .buttonList {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: #ff9900;
      color: white;
      border: none;
      padding: 1rem;
      font-size: 1.4rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #ff8b00;
      }
    }
  }
`;

export const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: -3rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);

  a {
    background: #ff9900;
    text-decoration: none;
    display: inline;
    line-height: 1.3;
    font-size: 2rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    margin: 0;
    font-size: 1.6rem;
    transform: none;
    margin-top: 0.5rem;

    a {
      font-size: 1.8rem;
      padding: 0.5rem 1rem;
    }
  }
`;

export const PriceTag = styled.span`
  background: #ff9900;
  transform: rotate(3deg);
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 2px;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 0.3rem 0.6rem;
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;

  align-items: flex-end;
  gap: 2rem;
`;
