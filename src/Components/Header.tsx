import {
  motion,
  useAnimation,
  useViewportScroll,
  Variants,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 100;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  width: 100px;
  height: 50px;
  margin-right: 50px;
  fill: ${(props) => props.theme.red};
`;

const Items = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Item = styled.li`
  color: rgba(255, 255, 255, 1);
  margin-right: 20px;
  position: relative;
`;

const Search = styled(motion.div)`
  display: flex;
  align-items: center;
  position: relative;
  color: rgba(255, 255, 255, 1);
  svg {
    height: 25px;
  }
`;

const SearchSvg = styled(motion.svg)`
  width: 18px;
  height: 18px;
  fill: rgba(255, 255, 255, 1);
  position: relative;
`;

const SearchSvgAlone = styled(SearchSvg)`
  position: absolute;
  right: 0;
`;

const SearchBox = styled(motion.form)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 210px;
  height: 32px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  transform-origin: center right;
`;

const SearchInput = styled(motion.input)`
  width: 180px;
  height: 24px;
  border: none;
  background-color: transparent;
  transform-origin: center right;
  color: rgba(255, 255, 255, 0.7);
  ::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const NavigationCircle = styled(motion.span)`
  // shape
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.red};
  // position
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -12px;
`;

const logoVariants: Variants = {
  initial: { fillOpacity: 1 },
  hover: { fillOpacity: [0, 1, 0], transition: { repeat: Infinity } },
};

const wrapperBackgroundVariants: Variants = {
  top: { background: 'rgba(0,0,0,0)' },
  scrolled: { background: 'rgba(0,0,0,1)' },
};

interface IForm {
  keyword: string;
}

export default function Header() {
  const matchesHome = useRouteMatch('/')?.isExact;
  const matchesMovieId = useRouteMatch('/movie/:movieId');
  const matchesTVShows = useRouteMatch('/tv_show');

  const [isSearching, setSearching] = useState(false);
  const toggleSearching = () => setSearching((prev) => !prev);

  const wrapperBackgroundAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) wrapperBackgroundAnimation.start('scrolled');
      else wrapperBackgroundAnimation.start('top');
    });
  }, [scrollY]);

  const { register, handleSubmit } = useForm<IForm>();
  const history = useHistory();
  const handleValid = (formData: IForm) => {
    history.push(`/search?keyword=${formData.keyword}`);
  };

  return (
    <Wrapper
      variants={wrapperBackgroundVariants}
      initial={{ background: 'rgba(0,0,0,0)' }}
      animate={wrapperBackgroundAnimation}
    >
      <Column>
        <Logo
          variants={logoVariants}
          initial="initial"
          whileHover="hover"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path
            color=""
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294
              5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051
              5.945v-276.742h41.08l56.212
              157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811
              57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621
              50.809-3.785 76.482-4.596v41.617l-119.724
              9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594
              0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002
              43.242zm70.266
              55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641
              103.507c24.594.539 49.456 2.434 73.51
              3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994
              49.457c13.783.812 28.377 1.623 42.43
              3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863
              145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617
              73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377
              72.699 30.27-72.699h47.295z"
          />
        </Logo>
        <Items>
          <Item>
            <Link to="/">Home</Link>
            {matchesHome || matchesMovieId ? (
              <NavigationCircle layoutId="navigationCircle" />
            ) : null}
          </Item>
          <Item>
            <Link to="/tv_show">TV Show</Link>
            {matchesTVShows ? (
              <NavigationCircle layoutId="navigationCircle" />
            ) : null}
          </Item>
        </Items>
      </Column>
      <Column>
        <Search>
          <SearchSvgAlone
            animate={{ x: isSearching ? -185 : 0 }}
            transition={{ type: 'tween' }}
            onClick={toggleSearching}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817
                4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></motion.path>
          </SearchSvgAlone>
          <SearchBox
            onSubmit={handleSubmit(handleValid)}
            animate={{ scaleX: isSearching ? 1 : 0 }}
            transition={{ type: 'tween' }}
            initial={false}
          >
            <SearchInput
              {...register('keyword', { required: true, minLength: 3 })}
              type="text"
              placeholder="Search..."
            />
          </SearchBox>
        </Search>
      </Column>
    </Wrapper>
  );
}
