import { useEffect,useState } from 'react';
import {set, useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import '../styles/PagRepublica.css';

