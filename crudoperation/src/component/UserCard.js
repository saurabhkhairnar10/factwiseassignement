import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Delete, Create } from '@mui/icons-material';
import '../css/UserCard.css';

const UserCard = ({ user, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleSave = () => {
    onEdit(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <>
      <Accordion expanded={isOpen} onChange={() => setIsOpen(!isOpen)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <img
            src={user.picture}
            alt={`${user.first} ${user.last}`}
            className="user-image"
          />
          <Typography className="card-text">{`${user.first} ${user.last}`}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div className="details-container">
            {!isEditing ? (
              <>
                <div className="user-info">
                  <div className="info-item">
                    <div className="label">Age</div>
                    <div>{new Date().getFullYear() - new Date(user.dob).getFullYear()} Years</div>
                  </div>
                  <div className="info-item">
                    <div className="label">Gender</div>
                    <div className="capitalize">{user.gender}</div>
                  </div>
                  <div className="info-item">
                    <div className="label">Country</div>
                    <div>{user.country}</div>
                  </div>
                </div>
                <div className="description">
                  <div className="label">Description</div>
                  <div>{user.description}</div>
                </div>
                <div className="action-buttons">
                  <IconButton onClick={() => setShowDeleteDialog(true)}>
                    <Delete className="icon red" />
                  </IconButton>
                  <IconButton onClick={handleEdit}>
                    <Create className="icon blue" />
                  </IconButton>
                </div>
              </>
            ) : (
              <div className="editing-container">
                <div className="grid-container">
                  <div className="info-item">
                    <div className="label">Age</div>
                    <TextField
                      value={new Date().getFullYear() - new Date(editedUser.dob).getFullYear()}
                      disabled
                      variant="outlined"
                      className="mt-1"
                    />
                  </div>
                  <div className="info-item">
                    <div className="label">Gender</div>
                    <TextField
                      value={editedUser.gender}
                      onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
                      variant="outlined"
                      className="mt-1"
                    />
                  </div>
                  <div className="info-item">
                    <div className="label">Country</div>
                    <TextField
                      value={editedUser.country}
                      onChange={(e) => setEditedUser({ ...editedUser, country: e.target.value })}
                      variant="outlined"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="description">
                  <div className="label">Description</div>
                  <TextField
                    value={editedUser.description}
                    onChange={(e) => setEditedUser({ ...editedUser, description: e.target.value })}
                    variant="outlined"
                    multiline
                    rows={4}
                    className="mt-1 w-full"
                  />
                </div>
                <div className="action-buttons">
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogContent>This action cannot be undone.</DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)} variant="outlined" color="secondary">Cancel</Button>
          <Button
            onClick={() => {
              onDelete(user.id);
              setShowDeleteDialog(false);
            }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserCard;
